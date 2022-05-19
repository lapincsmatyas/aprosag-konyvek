
 module.exports = {
   "stories": [
     "../projects/aprosag-webshop/**/*.stories.ts"
   ],
   "addons": [
     "@storybook/addon-links",
     "@storybook/addon-essentials",
     "@storybook/addon-interactions"
   ],
   "framework": "@storybook/angular",
   "core": {
     "builder": "@storybook/builder-webpack5"
   }
 }


