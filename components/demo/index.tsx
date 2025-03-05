import DemoRnPaper from "./reactNativePaper/demoRnPaper";
import UiKittenDemo from "./uiKitten/uiKittenDemo";

type Props = {
  name: "rnpaper" | "uikitten";
};

export default function DemoUi({ name }: Props) {
  return (
    <>
      <DemoRnPaper />
      {/* <UiKittenDemo /> */}

      {/* {name === "rnpaper" && <DemoRnPaper />} */}
      {/* {name === "uikitten" && <UiKittenDemo />} */}
    </>
  )
}