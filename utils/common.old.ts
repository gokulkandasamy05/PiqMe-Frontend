import DefaultImage from "../public/defaultProfile.jpg";
import { format } from "date-fns";

export const defaultImage = DefaultImage.src;

export const setProfileImage = ({
  destination,
  filename,
}: {
  destination?: string;
  filename?: string;
}) => {
  return destination && filename
    ? `https://piqme.live/api/${destination}${filename}`
    : defaultImage;
};

export const fetchConnectedList = async () => {
  const res = await fetch(`https://piqme.live/api/user/connections`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return res.json();
};

export const getDate = (date: Date) => {
  return format(new Date(date), "dd MMM yyyy");
};
