'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        beforeUpdate: async (model, attrs, options) => {
            // console.log('model', model)
            // console.log('attrs', attrs)
            const uid = attrs.uid
            const entity = await strapi.services.analysis.findOne(model);
            const entityUid = entity.uid

            if (uid !== entityUid) {
                console.log('error')
                throw new Error('invalid uid!')
            }
            // else {
            //     console.log('ok')
            // }
        }
    }
};
