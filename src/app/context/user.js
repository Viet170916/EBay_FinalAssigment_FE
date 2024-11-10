"use client"
import {createContext, useState, useEffect, useContext} from "react";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs"
import axios from "axios";

const Context = createContext();

const Provider = ({children}) => {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);
    const [name, setName] = useState(null);
    const [picture, setPicture] = useState(null);

    const supabaseClient = createClientComponentClient()

    const getCurrentSession = async () => {
        const res = await supabaseClient.auth.getSession()
        if (res && res.data.session) {
            return res.data.session
        }
        clearUser()
        return null
    }

    const getCurrentUser = async () => {
        if (id) return

        const res = await supabaseClient.auth.getUser()
        if (res && res.data.user) {

            const theUser = res.data.user
            setRole(theUser.role)
            setUser(theUser)
            setId(theUser.id)
            setEmail(theUser.email)
            setName(theUser.identities[0].identity_data.name)
            setPicture(theUser.identities[0].identity_data.picture)
        }
    }

    useEffect(() => {
        const isUser = async () => {
            const currentSession = await getCurrentSession()
            if (currentSession) await getCurrentUser()
        }
        isUser()
    }, []);
    useEffect(() => {
        if (user?.id) {
            axios.post("http://localhost:5180/api/account/is-vendor/" + user?.id).then((res) => {
                if (res.data?.isVendor) {
                    setUser(pu => ({...pu, role: "vendor"}));
                    setRole("vendor");
                } else {
                    setUser(pu => ({...pu, role: null}));
                    setRole(null);
                }
            });
        }
    }, [user?.id])

    const signOut = async () => {
        await supabaseClient.auth.signOut()
        clearUser()
        router.push('/')
    }

    const clearUser = () => {
        setUser(null)
        setId(null)
        setEmail(null)
        setName(null)
        setPicture(null)
        setRole(null)
    }

    const exposed = {user, id, email, role, name, picture, signOut, setRole, setUser};

    return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;