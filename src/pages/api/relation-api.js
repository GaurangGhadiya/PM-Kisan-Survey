// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {


    const relation = await fetch('http://himstaging1.hp.gov.in/urban-dept/getRelations');
    const relation_data = await relation.json();

    const data = {
        relations: relation_data.data.filter(item => item.relationNameEnglish !== '-'),
    }
    res.status(200).json(data)
}
