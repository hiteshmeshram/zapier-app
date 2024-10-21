export const HeroVideo = ()=>{
    return <div className="flex justify-center pb-11">
        <video
             className="max-w-4xl rounded-lg"
             src="https://res.cloudinary.com/zapier-media/video/upload/f_auto,q_auto/v1706042175/Homepage%20ZAP%20Jan%2024/012324_Homepage_Hero1_1920x1080_pwkvu4.mp4"
             autoPlay muted controls={false} ></video>
    </div>
}