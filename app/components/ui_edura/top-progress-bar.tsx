import { useNavigation } from "react-router";

export default function TopProgressBar() {
  const navigation = useNavigation();

  const active =
    navigation.state === "submitting" ||
    navigation.state === "loading";

  if (!active) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 w-full bg-transparent overflow-hidden">
        <div className="h-full w-1/2 bg-blue-500 animate-progress" />
      </div>
    </div>
  );
}
export function TopProgressBarFetch({active}:{active?:boolean}) {
  /** penggunaan
   const navigation = useNavigation();
  
    const active =
      navigation.state === "submitting" ||
      navigation.state === "loading";
    
    return <>
      ...
      <TopProgressBarFetch active={active}/>
      ...
      </>
   * 
   */

  if (!active) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 w-full bg-transparent overflow-hidden">
        <div className="h-full w-1/2 bg-blue-500 animate-progress" />
      </div>
    </div>
  );
}
