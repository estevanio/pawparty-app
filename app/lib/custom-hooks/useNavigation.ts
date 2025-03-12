import { useRouter } from "next/navigation";

export default function useNavigation() {
    
    const router = useRouter()

    const navigatePath = (path: string) => {
        router.push(path)   
    }

    const navigateDetails = (id: string) => {
        router.push(`/matchmaker/details/${id}`)
    }

    const navigateMatchmaker = () => {
        router.push(`/matchmaker/browse`)
    }

    const navigateMatches = () => {
        router.push(`/matchmaker/matches`)
    }

    const navigateHome = () => {
        router.push(`/`)
    }

    return {navigatePath, navigateDetails, navigateMatchmaker, navigateMatches}
}
