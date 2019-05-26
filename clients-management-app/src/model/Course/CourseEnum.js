const courseTypes = {
  ON_GOING: "ON_GOING",
  SKETCH: "SKETCH",
  OIL: "OIL",
  WATER_COLORS: "WATER_COLORS"
};

const COURSE_TYPES_VALUES = {};
COURSE_TYPES_VALUES[courseTypes.ON_GOING] = "On Going";
COURSE_TYPES_VALUES[courseTypes.SKETCH] = "Sketch";
COURSE_TYPES_VALUES[courseTypes.OIL] = "Oil";
COURSE_TYPES_VALUES[courseTypes.WATER_COLORS] = "Water Colors";

const COURSE_TYPES_PRICES = {};
COURSE_TYPES_PRICES[courseTypes.ON_GOING] = 150;
COURSE_TYPES_PRICES[courseTypes.SKETCH] = 1200;
COURSE_TYPES_PRICES[courseTypes.OIL] = 2000;
COURSE_TYPES_PRICES[courseTypes.WATER_COLORS] = 1500;

const COURSE_TYPES_DURATION = {};
COURSE_TYPES_DURATION[courseTypes.ON_GOING] = 1;
COURSE_TYPES_DURATION[courseTypes.SKETCH] = 8;
COURSE_TYPES_DURATION[courseTypes.OIL] = 8;
COURSE_TYPES_DURATION[courseTypes.WATER_COLORS] = 8;

const COURSES_ENUM = {};
Object.keys(courseTypes).forEach(key => {
  COURSES_ENUM[key] = {
    type: key,
    name: COURSE_TYPES_VALUES[key],
    price: COURSE_TYPES_PRICES[key],
    duration: COURSE_TYPES_DURATION[key]
  };
});

export default COURSES_ENUM;
