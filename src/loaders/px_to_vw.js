var loaderUtils = require("loader-utils");

module.exports = function(content, map) {

    const { minWidth, maxWidth = null } = loaderUtils.getOptions(this);

    let midResolutionContent = content;

    //convert px to vw
    midResolutionContent = midResolutionContent.replace(/(-?(\d|\.)+)px/g,'vw($1)');

    //remove non vw properties
    midResolutionContent = midResolutionContent.replace(/^((?!vw|\{|\}|\$|.\w,|\@media).)*$/g,'');

    //clear 1px size properties
    midResolutionContent = midResolutionContent.replace(/^.+vw\(1\).+$/g,'');

    //clear empty selectors with brackets
    midResolutionContent = midResolutionContent.replace(/([*a-z-.#&:_0-9>, ()\n\[\]=])+\s?\{\s+}/g, '');
    midResolutionContent = midResolutionContent.replace(/([*a-z-.#&:_0-9>, ()\n\[\]=])+\s?\{\s+}/g, '');
    midResolutionContent = midResolutionContent.replace(/([*a-z-.#&:_0-9>, ()\n\[\]=])+\s?\{\s+}/g, '');
    midResolutionContent = midResolutionContent.replace(/([*a-z-.#&:_0-9>, ()\n\[\]=])+\s?\{\s+}/g, '');

    //clear linebreaks
    midResolutionContent = midResolutionContent.replace(/\s+\n/g,'\n');

    if(maxWidth){
        midResolutionContent = `@media (min-width: ${minWidth}) and (max-width: ${maxWidth}){\n${midResolutionContent}\n}`;
    }else{
        midResolutionContent = `@media (min-width: ${minWidth}){\n${midResolutionContent}\n}`;
    }

    return content + '\n' + midResolutionContent;
};