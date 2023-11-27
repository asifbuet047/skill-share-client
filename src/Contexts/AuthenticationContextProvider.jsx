import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updateEmail, updatePassword, signOut, signInWithPopup } from "firebase/auth";
import { googleAuth, auth } from "../firebase.config";


export const AuthenticationContext = createContext();

function AuthenticationContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    const createNewUser = (mail, password) => {
        return createUserWithEmailAndPassword(auth, mail, password);
    }
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const changeExitingUsersNameAndPhotoURL = (name, photoURL) => {
        if (auth.currentUser) {
            let v = auth.currentUser;
            return updateProfile(v, { displayName: name, photoURL: photoURL });
        } else {
            return null;
        }
    }

    const changeExitingUsersEmail = (email) => {
        return updateEmail(user, email);
    }

    const changeExitingUsersPassword = (password) => {
        return updatePassword(user, password);
    }

    const signOutUser = () => {
        return signOut(auth);
    }

    const signInWithGoogleAccount = () => {
        return signInWithPopup(auth, googleAuth);
    }

    useEffect(() => {
        const userObserver = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setUserLoading(false);
            } else {
                setUser(null);
                setUserLoading(true);
            }
        });

        return () => userObserver();
    }, []);

    const authenticationData = {
        user,
        userLoading,
        createNewUser,
        signInUser,
        signOutUser,
        signInWithGoogleAccount,
        changeExitingUsersNameAndPhotoURL,
        changeExitingUsersEmail,
        changeExitingUsersPassword,
    }

    return (
        <AuthenticationContext.Provider value={authenticationData}>
            {children}
        </AuthenticationContext.Provider>
    )
}


export default AuthenticationContextProvider;