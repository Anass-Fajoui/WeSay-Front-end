import TweetForm from "../Components/TweetForm";
import Tweet from "../types";

const CreateTweetPage = () => {
    return (
        <>
            <div className="text-center text-3xl mb-4 mt-3 font-semibold">
                Create A New Tweet
            </div>
            <TweetForm
                tweet={{
                    id: 0,
                    title: "",
                    content: "",
                    likes: 0,
                    createdAt: new Date(),
                    lastModifiedAt: new Date(),
                }}
            />
        </>
    );
};

export default CreateTweetPage;
