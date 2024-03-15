import useSubStore from "../store/userSubscription";

const useRoutine = () => {
    const activeSub = useSubStore((state) => state.subInfo)
    const saveSub = useSubStore((state) => state.saveSub)
    const payInfo = useSubStore((state) => state.payInfo)
    const savePayDetails = useSubStore((state) => state.savePayInfo)
    const activeSubName = useSubStore((state) => state.subName)
    const saveSubName = useSubStore((state) => state.saveSubName)
    const isFree = () => {
      if(activeSubName === 'Free Plan'){
        return true
      } else return false
    }
  return {
   activeSub,
   saveSub,
   payInfo,
   savePayDetails,
   isFree ,
   saveSubName
  }
}

export default useRoutine