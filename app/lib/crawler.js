import axios from 'axios';
import { load } from 'cheerio';
import { writeFile } from 'fs';

const parseData = async (data) => {
	try {
		// Parse HTML with Cheerio
		const $ = load(data);

		// Initialise empty data array
		const animalInfo = [];
		const animalNames = [];
		const animalIds = [];
		const animalTypes = [];
		const animalGenders = [];
		const animalBreeds = [];
		const animalAges = [];
		const animalPhotos = [];

		// Iterate over all anchor links for the given selector and ....
		$('div.list-animal-name > a').each((_idx, el) => {
			// .... extract for each the tag text and add it to the data array
			const animalName = $(el).text()
			animalNames.push(animalName)
		});

		$('div.list-animal-photo-block > a > img.list-animal-photo').each((_idx, el) => {
			const animalPhoto = $(el).attr('src')
			animalPhotos.push(animalPhoto)
		});

		$('div.list-animal-id').each((_idx, el) => {
			const animalId = $(el).text()
			animalIds.push(animalId)
		});

		$('div.list-anima-species').each((_idx, el) => {
			const animalType = $(el).text()
			animalTypes.push(animalType)
		});

		$('div.list-animal-sexSN').each((_idx, el) => {
			const animalGender = $(el).text()
			animalGenders.push(animalGender)
		});

		$('div.list-animal-breed').each((_idx, el) => {
			const animalBreed = $(el).text()
			animalBreeds.push(animalBreed)
		});

		$('div.list-animal-age').each((_idx, el) => {
			const animalAge = $(el).text()
			animalAges.push(animalAge)
		});

		for (let i = 0; i < animalNames.length; i++){
			const animal={};
			animal.Name = animalNames[i];
			animal.Id = animalIds[i];
			animal.Type = animalTypes[i];
			animal.Gender = animalGenders[i];
			animal.Breed = animalBreeds[i];
			animal.Age = animalAges[i];
			animal.Photos = animalPhotos[i];
			animalInfo.push(animal);
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

        var tempData = await parseData(data);

        for (let i = 0; i < tempData.length; i++){
            animalData.push(tempData[i]);
        }

        data = await axios.request({
            method: "GET",
			url:'https://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimals.aspx?species=Cat&sex=A&agegroup=All&site=1223&onhold=A&orderby=ID&colnum=3&AuthKey=l1ec1s2ngeqgg3wuwnyscj771tr00hqk226mquetau7hd63yug&css=https://ws.petango.com/WebServices/adoptablesearch/css/styles.css',
            headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
            }
        });

		$ = load(data);

        tempData = await parseData(data);

        for (let i = 0; i < tempData.length; i++){
            animalData.push(tempData[i]);
        }

		writeFile("animalData.json",JSON.stringify(animalData),function(err){
			if(err){
				console.log(err)
			}
		})
		
		return;

	} catch (error) {
		throw error;
	}

};

export default getAnimalInformation;