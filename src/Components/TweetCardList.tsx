import TweetCard from "./TweetCard";

import Tweet from "../types"

const TweetCardList = ({ tweetList, updateData }: { tweetList: Tweet[], updateData : () => void }) => {
    return (
        <>
            <div className="container">
                {tweetList.map((tweet) => (
                    <TweetCard {...tweet} updateData={updateData} />
                ))}
                {tweetList.length == 0 && (
                    <div className="mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md text-center mt-4 p-3">
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                            No Tweets Found
                        </h4>
                        <p className="text-gray-500">
                            Looks like there are no tweets to display right now.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default TweetCardList;
