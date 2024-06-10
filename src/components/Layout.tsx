import Head from "next/head";
import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";
import styles from "./Layout.module.css";

const cx = classNames.bind(styles);
const inter = Inter({ subsets: ["latin"] });

interface IProps extends PropsWithChildren<{}> {}

export default function Layout({ children }: IProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={cx(styles.main, inter.className)}>{children}</main>
    </>
  );
}
