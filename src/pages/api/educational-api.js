// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {


    const educational_qualification = await fetch('http://himstaging1.hp.gov.in/urban-dept/getQualifications');
    const educational_qualification_data = await educational_qualification.json();

    const data = {
        educations: educational_qualification_data.data.filter(item => item.educationQualificationEnglish !== '-'),
    }


    res.status(200).json(data)
}
