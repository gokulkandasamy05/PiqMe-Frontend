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
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${destination}${filename}`
    : defaultImage;
};




export const fetchConnectedList = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${'/user/connections'}`,
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