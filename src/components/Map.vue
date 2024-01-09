<template>
	<div id="map" class="max-w-full w-full max-h-72 h-5/6"></div>
</template>

<script>
export default {
	name: "Map",
};
</script>

<script setup>
import { onMounted } from "vue";
import maplibregl from "maplibre-gl";
import geocodeByAddress from "../services/geocoding";
const props = defineProps({ controls: Boolean });

function createMap() {
	return (window.map = new maplibregl.Map({
		container: "map",
		center: [-37.102225, -10.925325],
		zoom: 16,
		pitch: 0,
	}));
}

function defineStyle(map) {
	map.setStyle({
		version: 8,
		sources: {
			osm: {
				type: "raster",
				tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
				tileSize: 256,
				attribution: "&copy; OpenStreetMap Contributors",
				maxzoom: 19,
			},
			terrainSource: {
				type: "raster-dem",
				url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
				tileSize: 256,
			},
			hillshadeSource: {
				type: "raster-dem",
				url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
				tileSize: 256,
			},
		},
		layers: [
			{
				id: "osm",
				type: "raster",
				source: "osm",
			},
			{
				id: "hills",
				type: "hillshade",
				source: "hillshadeSource",
				layout: { visibility: "visible" },
				paint: { "hillshade-shadow-color": "#473B24" },
			},
		],
		terrain: {
			source: "terrainSource",
			exaggeration: 1,
		},
	});
}

function defineControls(map) {
	map.addControl(
		new maplibregl.NavigationControl({
			visualizePitch: true,
			showZoom: true,
			showCompass: true,
		})
	);
}

// FUNÇÃO PARA MOVER O MAPA
// Rua Mirer, Numero, Bairro, Cidade, Estado
async function moveMapaPara(address) {
	const coordinates = await geocodeByAddress(address);

	const newCoordinates = [coordinates.lng, coordinates.lat];
	mapComponent.flyTo({
		center: newCoordinates,
		zoom: 14,
		speed: 0.5,
		curve: 1,
		easing(t) {
			return t;
		},
	});
}

// ADICIONAR MARCADORES
function populateInstituicoesEnsino(map) {
	const instituicoesEnsino = [];
	instituicoesEnsino.map((instituicaoEnsino) => {
		new maplibregl.Marker()
			.setLngLat([instituicaoEnsino.latitude, instituicaoEnsino.longitude])
			.addTo(map);
	});
}

onMounted(() => {
	const map = createMap();

	defineStyle(map);

	if (props.controls) {
		defineControls(map);
	}

	// Definir Icone da Imagem da Pessoa E instituição
	map.on("load", () => {
		map.loadImage(
			"https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png",
			(error, image) => {
				if (error) throw error;
				map.addImage("cat", image);
				map.addSource("point", {
					type: "geojson",
					data: {
						type: "FeatureCollection",
						features: [
							{
								type: "Feature",
								geometry: {
									type: "Point",
									coordinates: [0, 0],
								},
							},
						],
					},
				});
				map.addLayer({
					id: "points",
					type: "symbol",
					source: "point",
					layout: {
						"icon-image": "cat",
						"icon-size": 0.25,
					},
				});
			}
		);
	});
});
</script>

<style scoped></style>
