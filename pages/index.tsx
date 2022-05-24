import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";

type FormValues = {
	longUrl: string;
	shortUrl: string;
};

const Home: NextPage = () => {
	const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const isValidUrl = (longUrl: string) => {
		let url;

		try {
			url = new URL(longUrl);
		} catch (_) {
			return false;
		}

		return url.protocol === "http:" || url.protocol === "https:";
	};

	const shortenUrl: SubmitHandler<FormValues> = async (data) => {
		if (!isValidUrl(data.longUrl)) {
			enqueueSnackbar("URL is invalid. Please enter valid URL.", { variant: "error" });
			return;
		}

		const config: AxiosRequestConfig = {
			url: "/api/shortenUrl",
			headers: {
				"Content-Type": "application/json",
			},
			data: {
				...data,
			},
			method: "POST",
		};

		setLoading(true);
		await axios(config)
			.then((res) => {
				setGeneratedUrl(res.data);
				setLoading(false);
				enqueueSnackbar("URL shortened successfully!", { variant: "success" });
				reset();
			})
			.catch((err) => {
				const errorMessage: String = err.response.data.errorMessage;
				setLoading(false);
				setGeneratedUrl(null);
				enqueueSnackbar(errorMessage, { variant: "error" });
			});
	};

	const { register, handleSubmit, reset } = useForm<FormValues>();
	const { enqueueSnackbar } = useSnackbar();

	const copyUrl = async () => {
		await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_URL}${generatedUrl}`);
		enqueueSnackbar("URL copied successfully!", { variant: "success" });
	};

	return (
		<div className="h-screen">
			<div className="flex justify-center items-center h-full mx-4">
				<div className="flex flex-col space-y-4">
					<h1 className="font-bold text-xl text-center mb-8">Url Shortener</h1>
					<form onSubmit={handleSubmit(shortenUrl)} className="space-y-4 flex flex-col">
						<div className="flex-1">
							<input
								autoComplete="off"
								{...register("longUrl")}
								type="text"
								placeholder="Enter your long URL"
								className="px-2 py-1 bg-gray-100 focus:bg-white outline-indigo-700 w-full rounded-sm"
							/>
						</div>
						<div className="space-x-1 sm:space-x-2">
							<label htmlFor="short-url">{process.env.NEXT_PUBLIC_SITE_URL}</label>
							<input
								autoComplete="off"
								{...register("shortUrl")}
								type="text"
								id="short-url"
								placeholder="Enter your short URL"
								className="w-[170px] sm:w-auto px-2 py-1 bg-gray-100 focus:bg-white outline-indigo-700 rounded-sm"
							/>
						</div>
						<button
							type="submit"
							className="flex place-self-end px-3 py-1.5 bg-indigo-500 hover:opacity-90 text-white rounded-md"
						>
							Shorten URL!
						</button>
					</form>
					<div className={loading || generatedUrl ? "opacity-100" : "opacity-0 pointer-events-none"}>
						<button
							type="button"
							onClick={() => copyUrl()}
							title="copy link"
							className={`bg-green-600 mt-2 px-4 py-2 flex space-x-4 rounded-md w-full ${
								loading && "bg-gray-200 animate-pulse h-10"
							}`}
						>
							<h1 className={`${loading && "hidden"} flex-1 text-gray-100 text-left`}>
								{process.env.NEXT_PUBLIC_SITE_URL}
								{generatedUrl}
							</h1>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className={`h-6 w-6 ${loading && "hidden"}`}
								fill="none"
								viewBox="0 0 24 24"
								stroke="white"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
