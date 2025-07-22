export const defaultImage = 'https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg?semt=ais_hybrid&w=740'

export const setProfileImage = (obj : {destination:string, filename: string}) =>{
    return process.env.NEXT_PUBLIC_API_BASE_URL + '/' + obj?.destination + obj?.filename
}