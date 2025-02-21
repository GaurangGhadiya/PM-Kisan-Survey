// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {


    const gender = await fetch('http://himstaging1.hp.gov.in/urban-dept/getGender');
    const gender_data = await gender.json();

    const data = {
        gender: gender_data.data.filter(item => item.genderName !== '-'),
    }


    res.status(200).json(data)
}
