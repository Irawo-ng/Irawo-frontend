import { signInUserWithEmailAndPasword } from "./auth"


export async function testAuth () {
    await signInUserWithEmailAndPasword("testmycodelines@gmail.com", "Lagos@50")
}