import axios from 'axios';
import { load } from 'cheerio';
import { writeFile } from 'fs';

const parseData = async (Ids) =>{
	try{
		// Initialise empty data arrays
		const animalInfo = [];
		var animalPhotos = [];
		var temp;
		var animalName;
		var tdata;

		for (let i = 0; i < Ids.length; i++){
			var urls = 'https://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimalDetails.aspx?id='+Ids[i]+'&css=https://ws.petango.com/WebServices/adoptablesearch/css/styles.css&authkey=l1ec1s2ngeqgg3wuwnyscj771tr00hqk226mquetau7hd63yug'
			var { data } = await axios.request({
				method: "GET",
				url:urls,
				headers: {
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0"
				}
			});

			// Parse HTML with Cheerio
			var $ = load(data);
			temp = [];
			tdata = [];
			animalPhotos = [];

			// Iterate over all anchor links for the given selector and ....
			$('table.detail-table > tbody > tr > td.detail-value > span').each((_idx, el) => {
				// .... extract for each the tag text and add it to the data array
				temp = $(el).text();
				tdata.push(temp);
			});

			$('td.detail-animal-name > span').each((_idx, el) => {
				animalName = $(el).text();
			});

			$('table > tbody > tr > td > div.detail-photo-links > div > a').each((_idx, el) => {
				const animalPhoto = $(el).attr('href');
				animalPhotos.push(animalPhoto);
			});

			const animal={};
			animal.Id = tdata[0];
			animal.Name = animalName;
			animal.Species = tdata[1];
			animal.Breed = tdata[2];
			animal.Age = tdata[3];
			animal.Sex = tdata[4];
			animal.Color = tdata[6];
			animal.Shelter = tdata[8];
			animal.Location = tdata[9];
			animal.IntakeDate = tdata[10];
			animal.Photos = animalPhotos;
			animalInfo.push(animal);
		}

		return animalInfo;

	} catch (error) {
		throw error;
	}

};

const getAnimals = async (link) => {
	try {
		const animals = [];

		const { data } = await axios.request({
            method: "GET",
			url:link,
            headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
            }
        });

		const $ = load(data);
		var tempIds = [];
		var tempData;

		$('div.list-animal-id').each((_idx, el) => {
			const animalId = $(el).text()
			tempIds.push(animalId)
		});

		if(tempIds.length){
			tempData = await parseData(tempIds);

			for (let i = 0; i < tempData.length; i++){
				animals.push(tempData[i]);
			}
		}

		return animals;

	} catch (error) {
		throw error;
	}
}

const getAnimalInformation = async () => {
	try{
		const animalData = [];
		var tempDogData = await getAnimals('https://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimals.aspx?species=Dog&sex=A&agegroup=All&site=1223&onhold=A&orderby=ID&colnum=3&AuthKey=l1ec1s2ngeqgg3wuwnyscj771tr00hqk226mquetau7hd63yug&css=https://ws.petango.com/WebServices/adoptablesearch/css/styles.css');
		var tempCatData = await getAnimals('https://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimals.aspx?species=Cat&sex=A&agegroup=All&site=1223&onhold=A&orderby=ID&colnum=3&AuthKey=l1ec1s2ngeqgg3wuwnyscj771tr00hqk226mquetau7hd63yug&css=https://ws.petango.com/WebServices/adoptablesearch/css/styles.css');

		for (let i = 0; i < tempDogData.length; i++){
			animalData.push(tempDogData[i]);
		}
		for (let i = 0; i < tempCatData.length; i++){
			animalData.push(tempCatData[i]);
		}
		
		writeFile("app/lib/animalData.json",JSON.stringify(animalData),function(err){
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