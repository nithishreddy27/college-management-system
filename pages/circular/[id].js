import React from 'react'
import { getLoginSession } from '../../lib/auth';
import { findUser } from '../../lib/user';
import axios from 'axios';

export default function circularDisplay({c,id,userDetails}) {
    // console.log("leave")
    const circular = JSON.parse(c);
    const user = JSON.parse(userDetails);
    console.log('leave letter',c);
    const today = new Date();

  return (
    <div>
      <div className='w-[80%] flex-auto mx-auto scale-[85%]'>
        <div className=" bg-slate-50 w-[210mm] mx-auto flex-col my-8 h-[270mm] overflow-auto drop-shadow-2xl flex  min-w-[210mm]">
        {/* header */}
        <div className="my-6 mx-6 flex ">
          <div className="px-3">
            <img src="data:image/png;base64,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" />
          </div>
          <div className="text-center">
            <h1 className="text-center tracking-wide pt-3 px-14 font-bold font-serif text-2xl">
              CVR COLLEGE OF ENGINEERING
            </h1>
            <p className="text-gray-800 font-medium">
              Vastunagar, Mangalpalli (V), Ibrahimpatnam (M), R.R. District
            </p>
            <p className="text-gray-800 font-medium">
              ph. No. :918414 - 661601
            </p>
          </div>
        </div>
        <hr className="border-[0.3mm] border-gray-500 mx-8" />
        <hr className="border-[0.5mm] mt-[0.29mm] border-gray-600 mx-8" />
        {/* body */}
        <div className="mx-7 ">
          <div className="relative mx-2">
            {/* <span>F.No.CVR/29/May /2023/201</span> */}
            <span>{circular.fileNumber}</span>
            <span className="absolute right-5">Date: {today.getDate()+"-" +today.getMonth()+"-"+today.getFullYear()}</span>
          </div>
          <div className="text-center">
            <p className="py-8 text-lg font-semibold underline font-serif">
              CIRCULAR
            </p>
            <div className="text-start px-4">
              <p>{circular.circularBody}</p>
            </div>
            <div className="relative pt-8 ">
              <div className="absolute right-1">
                <img
                  className="h-[15mm]"
                  src="data:image/png;base64,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"
                />
                <p className="font-medium font-serif mt-2">HEAD OF DEPARTMENT</p>
              </div>
              <div className="absolute left-4 text-start pt-[35mm] ">
                <p className="font-medium"> Copy to </p>
                {circular.copyTo?.map((item)=>(
                    <p> {item}</p>

                ))}
                {/* <p>Vice-Principal</p>
                <p>All Deans</p>
                <p>All Associate Deans</p>
                <p>
                  All HoDs - for circulation among the Staff members and
                  students
                </p>
                <p>Placement officer</p>
                <p>Chairman - for favour of information</p>
                <p>Advisor - for favour of information</p>
                <p>All Students</p> */}

              </div>


              
            </div>
          </div>
        </div>
      </div></div> 
       
  </div>

  )
}

export const getServerSideProps = async (context) => {
    const session = await getLoginSession(context.req);
    const user = (session?._doc && (await findUser(session._doc))) ?? null;
    const data = JSON.stringify(user)

    console.log("id",context.query)
    const circulars = await axios.get(`http://localhost:3000/api/circular/display?cno=${context.query.id}`)
    // console.log("attendancce",leaveLetters.data)
    const circular = JSON.stringify(circulars.data.data[0])

    if (!user) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    // if (user.position !== "faculty") {
    //   return {
    //     redirect: {
    //       destination: `/profile/${user.position}`,
    //       permanent: false,
    //     },
    //   };
    // }
  return {
      props: {
      
        userDetails:data,
        c : circular,
        id:context.query.id
      },
    };
};
