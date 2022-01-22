import { Session } from 'next-auth';
import { prisma } from '../db';
import {useState} from "react"

export const IsAdmin = (Session : Session | null) => {
    if(Session && Session.user){
        const check = fetch(`/api/admin?email=${Session.user.email}`).then(res => res.json())
        return check
    }return false;
}

export default IsAdmin;
