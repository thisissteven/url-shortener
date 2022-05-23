import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";

type FormValues = {
	longUrl: String;
	shortUrl: String;
};

const Home: NextPage = () => {
	const [generatedUrl, setGeneratedUrl] = useState<String | null>(null);
	const shortenUrl: SubmitHandler<FormValues> = async (data) => {
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

		await axios(config)
			.then((res) => {
				setGeneratedUrl(res.data);
			})
			.catch((err) => {
				const errorMessage: String = err.response.data.errorMessage;
				enqueueSnackbar(errorMessage, { variant: "error" });
			});
	};

	const { register, handleSubmit } = useForm<FormValues>();
	const { enqueueSnackbar } = useSnackbar();

	return (
		<div className="h-screen">
			<div className="flex justify-center items-center h-full">
				<form onSubmit={handleSubmit(shortenUrl)} className="space-y-4 flex flex-col">
					<div className="flex-1">
						<input
							{...register("longUrl")}
							type="text"
							placeholder="Enter your long url"
							className="px-2 py-1 bg-gray-100 focus:bg-white outline-indigo-700 w-full rounded-sm"
						/>
					</div>
					<div className="space-x-2">
						<label htmlFor="short-url">localhost:3000/</label>
						<input
							{...register("shortUrl")}
							type="text"
							id="short-url"
							placeholder="Enter your short url"
							className="px-2 py-1 bg-gray-100 focus:bg-white outline-indigo-700 rounded-sm"
						/>
					</div>
					<div className="flex space-x-2">
						<button type="button" className="flex-1 bg-indigo-300 flex items-center px-2">
							<h1 className="flex-1 text-gray-800 text-left w-[152.75px]">http://localhost:3000/{generatedUrl}</h1>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
						</button>
						<button type="submit" className="px-4 py-2 bg-indigo-500 hover:opacity-90 text-white rounded-md">
							Shorten Url!
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Home;
