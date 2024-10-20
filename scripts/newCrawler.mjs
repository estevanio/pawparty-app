import axios from 'axios';
import { load } from 'cheerio';
import { writeFile } from 'fs';

const parseData = async (Ids) =>{
	try{
		// Initialise empty data arrays
		const animalInfo = [];
		const animalIds = [];
		const animalNames = [];
		const animalTypes = [];
		const animalBreeds = [];
		const animalAges = [];
		const animalGenders = [];
		const animalColors = [];
		const animalShelters = [];
		const animalLocations = [];
		const animalIntakes = [];
		const animalPhotos = [];

		for (let i = 0; i < Ids.length; i++){
			var urls = 'https://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimalDetails.aspx?id='+Ids[i]+'&css=https://ws.petango.com/WebServices/adoptablesearch/css/styles.css&authkey=l1ec1s2ngeqgg3wuwnyscj771tr00hqk226mquetau7hd63yug'
			var { data } = await axios.request({
				method: "GET",
				url:urls,
				headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
				}
			});
			console.log(urls)
			// Parse HTML with Cheerio
			var $ = load(data);
			console.log($)

			// Iterate over all anchor links for the given selector and ....
			$('tr.trAnimalID > td.detail-value').each((_idx, el) => {
				// .... extract for each the tag text and add it to the data array
				const animalId = $(el).text()
				console.log("animalId")
				animalIds.push(animalId)
			});

			$('td.detail-animal-name > span.lbName').each((_idx, el) => {
				const animalName = $(el).text()
				animalNames.push(animalName)
			});

			$('tr.trSpecies > td.detail-value').each((_idx, el) => {
				const animalType = $(el).text()
				animalTypes.push(animalType)
			});

			$('tr.trBreed > td.detail-value').each((_idx, el) => {
				const animalBreed = $(el).text()
				animalBreeds.push(animalBreed)
			});

			$('tr.trAge > td.detail-value').each((_idx, el) => {
				const animalAge = $(el).text()
				animalAges.push(animalAge)
			});

			$('tr.trSex > td.detail-value').each((_idx, el) => {
				const animalGender = $(el).text()
				animalGenders.push(animalGender)
			});

			$('tr.trColor > td.detail-value').each((_idx, el) => {
				const animalColor = $(el).text()
				animalColors.push(animalColor)
			});

			$('tr.trSite > td.detail-value').each((_idx, el) => {
				const animalSite = $(el).text()
				animalShelters.push(animalSite)
			});

			$('tr.trLocation > td.detail-value').each((_idx, el) => {
				const animalLocation = $(el).text()
				animalLocations.push(animalLocation)
			});

			$('tr.trIntakeDate > td.detail-value').each((_idx, el) => {
				const animalIntake = $(el).text()
				animalIntakes.push(animalIntake)
			});

			$('div.plPhotos > a').each((_idx, el) => {
				const animalPhoto = $(el).attr('href')
				animalPhotos.push(animalPhoto)
			});

			const animal={};
			animal.Id = animalIds;
			animal.Name = animalNames;
			animal.Species = animalTypes;
			animal.Breed = animalBreeds;
			animal.Age = animalAges;
			animal.Gender = animalGenders;
			animal.Color = animalColors;
			animal.Shelter = animalShelters;
			animal.Location = animalLocations;
			animal.IntakeDate = animalIntakes;
			animal.Photos = animalPhotos;
			animalInfo.push(animal);
			// console.log(animal);
		}

		return animalInfo;

	} catch (error) {
		throw error;
	}

};

const getAnimalInformation = async () => {
	try {
		const animalData = [];

		var { data } = await axios.request({
            method: "GET",
			url:'https://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimals.aspx?species=Dog&sex=A&agegroup=All&site=1223&onhold=A&orderby=ID&colnum=3&AuthKey=l1ec1s2ngeqgg3wuwnyscj771tr00hqk226mquetau7hd63yug&css=https://ws.petango.com/WebServices/adoptablesearch/css/styles.css',
            headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
            }
        });

		var $ = load(data);
		var tempIds = [];

		$('div.list-animal-id').each((_idx, el) => {
			const animalId = $(el).text()
			tempIds.push(animalId)
		});

		if(tempIds.length){
			var tempData = await parseData(tempIds);

			for (let i = 0; i < tempData.length; i++){
				animalData.push(tempData[i]);
			}
		}

		data = await axios.request({
            method: "GET",
			url:'https://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimals.aspx?species=Cat&sex=A&agegroup=All&site=1223&onhold=A&orderby=ID&colnum=3&AuthKey=l1ec1s2ngeqgg3wuwnyscj771tr00hqk226mquetau7hd63yug&css=https://ws.petango.com/WebServices/adoptablesearch/css/styles.css',
            headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
            }
        });

		$ = load(data);
		tempIds = [];

		$('div.list-animal-id').each((_idx, el) => {
			const animalId = $(el).text()
			tempIds.push(animalId)
		});

		if(tempIds.length){
			tempData = await parseData(tempIds);

			for (let i = 0; i < tempData.length; i++){
				animalData.push(tempData[i]);
			}
		}
		
		writeFile("newAnimalData.json",JSON.stringify(animalData),function(err){
			if(err){
				console.log(err)
			}
		})
		
		return;

	} catch (error) {
		throw error;
	}

};
getAnimalInformation()
// export default getAnimalInformation;