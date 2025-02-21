// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

    const callAPi = await fetch('http://himstaging1.hp.gov.in/urban-dept/getEconomicCategories');
    const response = await callAPi.json();

    const callReligion = await fetch('http://himstaging1.hp.gov.in/urban-dept/getReligions');
    const religion = await callReligion.json();

    const social_category = await fetch('http://himstaging1.hp.gov.in/urban-dept/getSocialCategories');
    const social_cat = await social_category.json();

    const resident = await fetch('http://himstaging1.hp.gov.in/urban-dept/getLocations');
    const resident_data = await resident.json();

    const gender = await fetch('http://himstaging1.hp.gov.in/urban-dept/getGender');
    const gender_data = await gender.json();




    const data = {
        economicCategories: response.data.filter(item => item.economicStatus !== '-'),
        religions: religion.data.filter(item => item.religionName !== '-'),
        social_categories: social_cat.data.filter(item => item.socialCategoryNameEnglish !== '-'),
        resident: resident_data.data.filter(item => item.religionName !== '-'),
        gender: gender_data.data.filter(item => item.religionName !== '-'),

    }

    res.status(200).json(data)
}
