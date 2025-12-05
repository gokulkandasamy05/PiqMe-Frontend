import { redirect } from "next/navigation";
import { persistor } from "./appStore";
import DefaultImage from '../public/defaultProfile.jpg';
import { format } from "date-fns";
export const defaultImage: string = DefaultImage.src;

export const setProfileImage = ({
  destination,
  filename,
}: {
  destination: string | undefined;
  filename: string | undefined;
}): string => {
  return (destination && filename)
    ? `${'https://piqme.live/api'}/${destination}${filename}`
    : defaultImage;
};



export const logout = async () => {
  const res = await fetch('https://piqme.live/api' + "/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });

  const data = await res?.json()
  if (data?.status) {
    persistor.purge()
    redirect('/login')
  }
  return data?.status
}

export const fetchConnectedList = async () => {
  const res = await fetch(
    `${'https://piqme.live/api'}${'/user/connections'}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  )
  const result = await res.json()
  // console.log(result);

  return result
}

export const getDate = (date : Date) => {
  const formattedDate = format(new Date(date), 'dd MMM yyyy');
  return formattedDate
}