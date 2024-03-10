import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"; 

export default function useStorage(key, defaultValue) {
    const [value, setValue] = useState(async () => {
        const querySnapshot = await getDocs(collection(db, "cities"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
    })

    //useEffect(() => {localStorage.setItem(key, JSON.stringify(value))}, [key, value])
    
    return [value, setValue]
}

export default async function getBudgets() {
    const querySnapshot = await getDocs(collection(db, "budgets"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });
    
}

useEffect(() => {getBudgets()}, [])