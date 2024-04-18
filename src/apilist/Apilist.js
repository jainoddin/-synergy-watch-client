export const server = `http://localhost:4444`;

const apilist = {

    login: `${server}/login`,
    signup: `${server}/signup`,
    individualvideo: `${server}/individualvideo`,
    getallvideos: `${server}/get-video-details`,
    savevideostatus:`${server}/videos/`,
    updatelikevideo:`${server}/updatelikevideo/`,
    updateunlikevideo: `${server}/updatelikevideo/`,
    trendingvideos: `${server}/get-video-detail?category=Trending`,
    gamingvideos: `${server}/get-video-detail?category=Gaming`,
    SavedVideos : `${server}/get-video-savedetail?saved=Saved`,

}
export default apilist;