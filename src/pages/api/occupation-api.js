// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {


    const occupation = await fetch('http://himstaging1.hp.gov.in/urban-dept/getOccupations');
    const occupation_data = await occupation.json();

    const data = {
        occupations: occupation_data.data.filter(item => item.professionName !== '-'),
    }
    res.status(200).json(data)
}
