import React from 'react'
import fcb from "../../assets/imgs/ci/fcb.svg"
import ig from "../../assets/imgs/ci/ig.svg"
import tw from "../../assets/imgs/ci/tw.svg"
import yt from "../../assets/imgs/ci/yt.svg"
import li from "../../assets/imgs/ci/li.svg"
import cookies from 'js-cookie'

function MemberCard({ data }) {

     return (
          <div className="py-12 w-60">
               <img className=" h-60  object-cover rounded-xl shadow-xl" src={data.photo} alt="Light.services" />
               <div className=" px-2">
                    <h1 className="text-xl py-4" >{data.fullname}</h1>
                    <h6 className="text-sm"> {cookies.get('i18next') === 'ar' ? data.workplace__ar : (cookies.get('i18next') === 'fr' ? data.workplace__fr : data.workplace__en)} </h6>
                    <p className="py-2 text-xs"> {cookies.get('i18next') === 'ar' ? data.description__ar : (cookies.get('i18next') === 'fr' ? data.description__fr : data.description__en)}  </p>
                    <div className="flex flex-row pt-2 justify-between px-6">
                         {data.facebook === null ? null : <a href={data.facebook} target='_blank'><img width="24" src={fcb} alt="Light.services" /></a>}
                         {data.instagram === null ? null : <a href={data.instagram} target='_blank'><img width="24" src={ig} alt="Light.services" /></a>}
                         {data.twitter === null ? null : <a href={data.twitter} target='_blank'><img width="24" src={tw} alt="Light.services" /></a>}
                         {data.linkedin === null ? null : <a href={data.linkedin} target='_blank'><img width="24" src={li} alt="Light.services" /></a>}
                         {data.youtube === null ? null : <a href={data.youtube} target='_blank'><img width="24" src={yt} alt="Light.services" /></a>}
                    </div>
               </div>
          </div>
     )
}

export default MemberCard
