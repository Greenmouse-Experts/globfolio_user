import useSubStore from "../store/userSubscription";

const useRoutine = () => {
    const activeSub = useSubStore((state) => state.subInfo)
    const saveSub = useSubStore((state) => state.saveSub)
    const payInfo = useSubStore((state) => state.payInfo)
    const savePayDetails = useSubStore((state) => state.savePayInfo)
  return {
   activeSub,
   saveSub,
   payInfo,
   savePayDetails
  }
}

export default useRoutine