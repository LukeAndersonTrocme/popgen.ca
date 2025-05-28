// src/data/aims.js
import spatialImg from "@/assets/aims/spatial.jpg";
import argImg from "@/assets/aims/arg.jpg";
import genealogyImg from "@/assets/aims/genealogy.jpg";
import conservationImg from "@/assets/aims/conservation.jpg";
import humanHistoryImg from "@/assets/aims/human-history.jpg";

export default [
	{
		id: "spatial",
		title: "Spatial genetics",
		img: spatialImg,
		blurb: "Quantifying how geography shapes gene flow.",
		details: "We build hex-bin maps, distance-decay models…",
	},
	{
		id: "arg",
		title: "Ancestral recombination graphs",
		img: argImg,
		blurb: "Reconstructing genealogies across genomes.",
		details: "Developing tools to trace ancestry paths in large datasets.",
	},
	{
		id: "genealogy",
		title: "Pedigree & genealogy",
		img: genealogyImg,
		blurb: "Bridging recorded pedigrees with genetic data.",
		details: "Integrating family records and genomes at population scale.",
	},
	{
		id: "conservation",
		title: "Conservation applications",
		img: conservationImg,
		blurb: "Informing strategies for endangered species.",
		details: "Using spatial genetics to guide biodiversity management.",
	},
	{
		id: "human-history",
		title: "Human genetic history",
		img: humanHistoryImg,
		blurb: "Uncovering migration and demographic events.",
		details: "Continuous models reveal fine-scale population structure.",
	},
];
