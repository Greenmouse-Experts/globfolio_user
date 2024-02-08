import useSubStore from "../store/userSubscription";

const useRoutine = () => {
    const activeSub = useSubStore((state) => state.subInfo)
    const saveSub = useSubStore((state) => state.saveSub)
  return {
   activeSub,
   saveSub,
  }
}

export default useRoutine