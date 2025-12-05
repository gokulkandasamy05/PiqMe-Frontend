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
  const API = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  return destination && filename
    ? `${API}/${destination}${filename}`
    : defaultImage;
};

export const fetchConnectedList = async () => {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const res = await fetch(`${API}/user/connections`, {
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
