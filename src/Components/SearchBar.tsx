import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { User } from "../types";
import axios from "axios";
import authenticate from "../Service/authenticate";
import { AxiosError } from "axios";
import { debounce } from "lodash";
import { useRef } from "react";

const SearchBar = () => {
    let [token, userId] = authenticate();
    const navigate = useNavigate();
    const [hidden, setHidden] = useState<Boolean>(true);
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<String>("");

    const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setHidden(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const debounceUpdateUsers = useCallback(
        debounce((term: String) => {
            updateUsers(term);
        }, 300),
        []
    );

    function handleDisplay() {
        setHidden(false);
    }
    async function updateUsers(query: String) {
        try {
            let response = await axios.get(
                `http://localhost:8080/api/user/search?query=${query}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUsers(response.data);
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                if (err.response.status === 403) {
                    navigate("/login");
                } else {
                    console.log(e);
                }
            }
        }
    }
    useEffect(() => {
        
        debounceUpdateUsers(searchTerm);
        

        return () => debounceUpdateUsers.cancel();
    }, [searchTerm, debounceUpdateUsers]);

    return (
        <div className="relative flex justify-center items-center px-0">
            <input
                size={33}
                type="text"
                onClick={() => handleDisplay()}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users by name or username"
                className="p-2 px-3 bg-gray-100 rounded-4xl cursor-pointer w-fit outline-none
                                      hover:bg-gray-200
                                      transition-all duration-200
                                      hover:shadow-[0_0_8px_rgba(0,0,0,0.1)]"
            />

            <i
                className="fa-solid fa-magnifying-glass rounded-full mx-2 !p-[10px] cursor-pointer 
                          bg-gray-100 hover:bg-gray-200 hover:text-[#2096f2] transition-all"
                onClick={() => setHidden(false)}
            ></i>
            {!hidden && (
                <div
                    className="absolute left-0 top-full mt-1 w-48 bg-white rounded-2xl shadow-lg 
                               z-50 w-full"
                    ref={dropdownRef}
                >
                    {users.map((user) => (
                        <div
                            className="rounded-2xl block px-4 py-2 cursor-pointer text-gray-700 
                                        hover:bg-gray-50 transition-colors decoration-0"
                            onClick={() => navigate(`/profile/${user.id}`)}
                        >
                            {user.firstName + " " + user.lastName}
                        </div>
                    ))}
                    {!searchTerm && users.length === 0 &&(
                        <div
                            className="rounded-2xl block px-4 py-3 cursor-pointer text-gray-700 
                                        hover:bg-gray-50 transition-colors decoration-0 text-center"
                        >
                            Search by name or username
                        </div>
                    )}
                    {users.length === 0 && searchTerm && (
                        <div
                            className="rounded-2xl block px-4 py-3 cursor-pointer text-gray-700 
                                        hover:bg-gray-50 transition-colors decoration-0 text-center"
                        >
                            No users Found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
