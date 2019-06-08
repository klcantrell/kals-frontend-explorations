import * as R from 'ramda';
import { APP_ID } from 'babel-dotenv';

const MSGS = {
  CITY_INPUT: 'CITY_INPUT',
  ADD_CITY: 'ADD_CITY',
  DELETE_CITY: 'DELETE_CITY',
  WEATHER_REQUEST_SUCCESS: 'WEATHER_REQUEST_SUCCESS',
  WEATHER_REQUEST_ERROR: 'WEATHER_REQUEST_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

function weatherUrl(city) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    city
  )}&units=imperial&APPID=${APP_ID}`;
}

function cityInput(input) {
  return {
    type: MSGS.CITY_INPUT,
    cityInput: input,
  };
}

const addCity = {
  type: MSGS.ADD_CITY,
};

function deleteCity(id) {
  return {
    type: MSGS.DELETE_CITY,
    id,
  };
}

const weatherRequestSuccess = R.curry((id, response) => {
  return {
    type: MSGS.WEATHER_REQUEST_SUCCESS,
    id,
    response,
  };
});

function weatherRequestError(error) {
  return {
    type: MSGS.WEATHER_REQUEST_ERROR,
    error,
  };
}

const clearError = {
  type: MSGS.CLEAR_ERROR,
};

function update(msg, model) {
  switch (msg.type) {
    case MSGS.CITY_INPUT: {
      const { cityInput } = msg;
      return {
        ...model,
        cityInput,
      };
    }
    case MSGS.ADD_CITY: {
      const cities = R.clone(model.cities);
      cities.push({
        name: model.cityInput,
        currentTemp: '?',
        lowTemp: '?',
        highTemp: '?',
        id: model.nextId,
      });
      return [
        {
          ...model,
          nextId: model.nextId + 1,
          cityInput: '',
          cities,
        },
        {
          request: { url: weatherUrl(model.cityInput) },
          onSuccess: weatherRequestSuccess(model.nextId),
          onError: weatherRequestError,
        },
      ];
    }
    case MSGS.DELETE_CITY: {
      const cities = R.filter(c => c.id !== msg.id, model.cities);
      return {
        ...model,
        cities,
      };
    }
    case MSGS.WEATHER_REQUEST_SUCCESS: {
      const { id, response } = msg;
      const { cities } = model;
      const { temp, temp_min, temp_max } = R.pathOr(
        {},
        ['data', 'main'],
        response
      );
      const updatedCities = R.map(city => {
        if (city.id === id) {
          return {
            ...city,
            currentTemp: Math.round(temp),
            lowTemp: Math.round(temp_min),
            highTemp: Math.round(temp_max),
          };
        }
        return city;
      }, cities);
      return {
        ...model,
        cities: updatedCities,
      };
    }
    case MSGS.WEATHER_REQUEST_ERROR: {
      const { error } = msg;
      const { message } = R.pathOr({}, ['response', 'data'], error);
      return {
        ...model,
        errorMessage: message || null,
      };
    }
    case MSGS.CLEAR_ERROR: {
      return {
        ...model,
        errorMessage: null,
      };
    }
    default: {
      return model;
    }
  }
}

export default update;

export { addCity, cityInput, deleteCity, clearError };
