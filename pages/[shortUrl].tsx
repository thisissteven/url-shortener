import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import router from "next/router";
import React from "react";
import prisma from "../lib/prisma";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
	shortUrl: string;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { shortUrl } = ctx.params as Params;

	const url = await prisma.link.findUnique({
		where: {
			shortUrl: shortUrl as string,
		},
	});

	if (url) {
		return {
			redirect: {
				destination: url.longUrl,
			},
		};
	} else {
		return {
			redirect: {
				destination: "/",
			},
		};
	}

	return {
		props: {},
	};
};

const ShortURL = () => {
	return <div></div>;
};

export default ShortURL;
