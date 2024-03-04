import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./MoodToggle";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import { BsTwitterX } from "react-icons/bs";

import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
  
const Header = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 dark:border-gray-700 bg-white/75 dark:bg-black/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-700 ">
          <Link href="/" className="flex z-40 font-semibold">
            <span>metanft.</span>
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            <ModeToggle />
            <Link href="/">
            <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">My Socials</Button>
            </DrawerTrigger>
            <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
                <DrawerHeader >
                <DrawerTitle className="text-center">You can find me & my projects here </DrawerTitle>
                <DrawerDescription className="text-center">All my social handles</DrawerDescription>
                </DrawerHeader>
                <div className="space-y-4">
                <Link href="https://twitter.com/mayanks_tw" target="blank">
                <Button className="max-w-5xl flex justif-center w-full"  variant="secondary">Twitter /  <BsTwitterX className="ml-[0.5rem]" /> </Button>
                </Link>
                <Link href="https://github.com/codescalper" target="blank">
                <Button className="max-w-5xl flex justif-center w-full"  variant="secondary"> Github <FaGithub className="ml-[0.5rem]" /> </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/mayankonli/" target="blank">
                <Button className="max-w-5xl flex justif-center w-full"  variant="secondary">Linkedin <FaLinkedin className="ml-[0.5rem]" /> </Button>
                </Link>
                <Link href="https://www.instagram.com/mayankonweb/" target="blank">
                <Button className="max-w-5xl flex justif-center w-full"  variant="secondary">Instagram <FaInstagram className="ml-[0.5rem]" /> </Button>
                </Link>
                </div>
                <DrawerFooter>
                <Link href="https://github.com/codescalper/metaNFT">
                <Button className="max-w-5xl flex justif-center"  variant="outline">Star ⭐ this on Github <FaGithub className="ml-[0.5rem]" /> </Button>
                </Link>
                </DrawerFooter>
            </div>
            </DrawerContent>
            </Drawer>

            </Link>
          
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Header;