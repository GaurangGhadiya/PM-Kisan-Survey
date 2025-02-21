// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { useDispatch } from "react-redux"
import { onReligionList } from "../../network/actions/religion";

import initializeStore from "../../store";

export default async function handler(req, res) {


  // var dispatch = useDispatch();

  // const rootDispatch = initializeStore.dispatch;



  // Dispatch the action
  // rootDispatch(onReligionList());

  res.status(200).json({ name: 'John Doe' })
  // try {
  //   // dispatch(onReligionList())


  // } catch (error) {
  //   res.status(500).json(error.message)
  // }






}
