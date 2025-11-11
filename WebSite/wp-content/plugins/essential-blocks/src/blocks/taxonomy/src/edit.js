/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Fragment, useEffect, memo, useState } from "@wordpress/element";
import { useEntityRecords, store as coreStore } from "@wordpress/core-data";
import { select, useSelect, withSelect } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import apiFetch from "@wordpress/api-fetch";

/**
 * Internal depencencies
 */
import Style from "./style";
import Inspector from "./inspector";
import defaultAttributes from "./attributes";
import { ReactComponent as TaxonomyIcon } from "./icon.svg";
import { ebLoader, renderCategoryName } from "./helpers";

/**
 * External depencencies
 */
import {
    DynamicInputValueHandler,
    BlockProps,
    withBlockContext,
    EBDisplayIcon,
    NoticeComponent,
} from "@essential-blocks/controls";

function Edit(props) {
    const { attributes, setAttributes, isSelected, selectPostType, context } =
        props;

    const {
        blockId,
        classHook,
        selectedTaxonomy,
        showHierarchy,
        showPostCounts,
        displayStyle,
        prefixType,
        prefixText,
        prefixIcon,
        suffixType,
        suffixIcon,
        suffixText,
        separator,
        showSeparator,
        taxonomyLimit,
        taxonomiesQuery,
        source,
        currentPostType,
        currentPostId,
    } = attributes;

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: "eb-taxonomy",
        style: <Style {...props} />,
    };

    // this useEffect is for creating a unique id for each block's unique className by a random unique number
    useEffect(() => {
        if (selectPostType) {
            setAttributes({
                currentPostType: selectPostType,
            });
        }
    }, []);

    const postType = select("core/editor").getCurrentPostType();

    // Get post data from Loop Builder context
    const loopPostId = context?.["essential-blocks/postId"];
    const loopPostType = context?.["essential-blocks/postType"];

    // Check if block is inside Loop Builder context
    // We need to check multiple conditions because context might be available at different times
    const isInLoopBuilder = Boolean(
        context &&
            // Primary check: explicit isLoopBuilder flag
            (context["essential-blocks/isLoopBuilder"] === true ||
                // Secondary check: presence of loop context values (even if null initially)
                (context.hasOwnProperty("essential-blocks/postId") &&
                    context.hasOwnProperty("essential-blocks/postType"))),
    );

    // Use loop context values when in Loop Builder, otherwise use current values
    const effectivePostType = isInLoopBuilder ? loopPostType : postType;
    const effectivePostId = isInLoopBuilder ? loopPostId : currentPostId;

    // State for Loop Builder taxonomy data
    const [loopBuilderTaxonomyData, setLoopBuilderTaxonomyData] =
        useState(null);
    const [isLoadingLoopData, setIsLoadingLoopData] = useState(false);

    // Effect to handle Loop Builder context initialization
    useEffect(() => {
        if (isInLoopBuilder) {
            // Set source to current-post and update context values
            setAttributes({
                source: "current-post",
                currentPostId: loopPostId || 0,
                currentPostType: loopPostType || "post",
            });
        }
    }, [isInLoopBuilder, loopPostId, loopPostType]);

    // Effect to fetch taxonomy data for Loop Builder context
    useEffect(() => {
        if (isInLoopBuilder && effectivePostId && selectedTaxonomy) {
            setIsLoadingLoopData(true);

            // Fetch post data to get taxonomy terms
            apiFetch({
                path: `/wp/v2/${effectivePostType}s/${effectivePostId}?_embed`,
            })
                .then((postData) => {
                    // Extract taxonomy terms from the post data
                    const taxonomyTerms = [];

                    if (
                        postData &&
                        postData._embedded &&
                        postData._embedded["wp:term"]
                    ) {
                        // Find terms for the selected taxonomy
                        const termArrays = postData._embedded["wp:term"];
                        termArrays.forEach((termArray) => {
                            termArray.forEach((term) => {
                                if (term.taxonomy === selectedTaxonomy) {
                                    taxonomyTerms.push({
                                        id: term.id,
                                        name: term.name,
                                        link: term.link,
                                        count: term.count || 0,
                                        parent: term.parent || 0,
                                    });
                                }
                            });
                        });
                    }

                    setLoopBuilderTaxonomyData(taxonomyTerms);
                    setIsLoadingLoopData(false);
                })
                .catch((error) => {
                    console.error(
                        "Failed to fetch taxonomy data for Loop Builder:",
                        error,
                    );
                    setLoopBuilderTaxonomyData([]);
                    setIsLoadingLoopData(false);
                });
        } else if (!isInLoopBuilder) {
            // Clear Loop Builder data when not in Loop Builder context
            setLoopBuilderTaxonomyData(null);
            setIsLoadingLoopData(false);
        }
    }, [isInLoopBuilder, effectivePostId, effectivePostType, selectedTaxonomy]);

    useEffect(() => {
        if (taxonomyLimit == undefined) {
            setAttributes({ taxonomyLimit: 0 });
        }
    }, [taxonomyLimit]);

    // on source change
    useEffect(() => {
        if (isInLoopBuilder && source === "current-post") {
            setAttributes({
                taxonomiesQuery: {
                    ...taxonomiesQuery,
                    type: effectivePostType,
                },
            });
        } else if (!isInLoopBuilder && source === "current-post") {
            if (postType === "templately_library") {
                let type = "post";
                const templateType =
                    select("core/editor").getEditedPostAttribute(
                        "templately_type",
                    );
                if (templateType) {
                    if (
                        ["product_archive", "product_single"].includes(
                            templateType,
                        )
                    ) {
                        type = "product";
                    }
                    if (
                        ["course_archive", "course_single"].includes(
                            templateType,
                        )
                    ) {
                        type = "sfwd-courses";
                    }
                }
                setAttributes({
                    taxonomiesQuery: { ...taxonomiesQuery, type },
                });
            } else if (postType === "wp_template") {
                const slugArray = select("core/editor")
                    .getEditedPostAttribute("slug")
                    .split("-");
                let type = "post";
                if (slugArray.length > 1) {
                    type = slugArray[1];
                }
                if (slugArray.length === 1 && slugArray[0] === "page") {
                    type = "page";
                }
                setAttributes({
                    taxonomiesQuery: { ...taxonomiesQuery, type },
                });
            } else {
                setAttributes({
                    taxonomiesQuery: {
                        ...taxonomiesQuery,
                        type: selectPostType,
                    },
                });
            }
        } else {
            let newQuery = { ...taxonomiesQuery };
            if (newQuery.hasOwnProperty("type")) {
                delete newQuery.type;
            }
            setAttributes({ taxonomiesQuery: newQuery });
        }
    }, [source]);

    // on taxonomiesQuery change
    const { taxonomies, hasResolved } = useSelect(
        (select) => {
            return {
                taxonomies: select(coreStore).getTaxonomies(taxonomiesQuery),
                hasResolved: select(coreStore).hasFinishedResolution(
                    "getTaxonomies",
                    [taxonomiesQuery],
                ),
            };
        },
        [taxonomiesQuery],
    );

    useEffect(() => {
        if (hasResolved) {
            if (!selectedTaxonomy && taxonomies && taxonomies.length) {
                setAttributes({ selectedTaxonomy: taxonomies[0].slug });
            } else {
                if (taxonomies && taxonomies.length) {
                    const slugs = taxonomies.map((each) => each.slug);
                    if (!slugs.includes(selectedTaxonomy)) {
                        setAttributes({ selectedTaxonomy: slugs[0] });
                    }
                } else {
                    setAttributes({ selectedTaxonomy: "" });
                }
            }
        }
    }, [taxonomies, hasResolved]);
    const query = { per_page: taxonomyLimit == 0 ? -1 : taxonomyLimit }
    const { records: categories, isResolving } = useEntityRecords(
        "taxonomy",
        selectedTaxonomy,
        query,
    );

    const getCategoriesList = (parentId) => {
        if (!categories?.length) {
            return [];
        }
        if (parentId === null) {
            return categories;
        }
        return categories.filter(({ parent }) => parent === parentId);
    };

    const renderCategoryList = () => {
        let categoriesList = [];
        if (source === 'current-post') {
            let name = 'Category'
            if (selectedTaxonomy && taxonomies) {
                const tax = taxonomies.find(each => each.slug === selectedTaxonomy);
                if (tax) {
                    name = tax.name
                }
            }
            categoriesList = [{
                id: 0, link: '#', count: 5, name
            }]
        } else {
            const parentId = showHierarchy ? 0 : null;
            categoriesList = getCategoriesList(parentId);
        }
        return categoriesList.map((category, index) => renderCategoryListItem(category));
    };

    const renderCategoryListItem = (category) => {
        const childCategories = getCategoriesList(category.id);
        const { id, link, count, name } = category;
        return (
            <Fragment key={id}>
                <span className={`eb-tax-item eb-tax-item-${id}`}>
                    <a href={link} target="_blank" rel="noreferrer noopener">
                        {renderCategoryName(name)}
                    </a>
                    {showPostCounts && ` (${count})`}
                    {showHierarchy && childCategories.length && (
                        <ul className="children">
                            {childCategories.map((childCategory) =>
                                renderCategoryListItem(childCategory)
                            )}
                        </ul>
                    )}
                </span>
                {showSeparator && separator && (
                    <span className="eb-tax-separator">{separator}</span>
                )}
            </Fragment>
        );
    };
    const taxonomyNotice = ebLoader();

    return (
        <>
            {isSelected && (
                <Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                    taxonomies={taxonomies}
                    context={context}
                />
            )}

            <BlockProps.Edit {...enhancedProps}>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    {!hasResolved && (
                        <NoticeComponent
                            Icon={TaxonomyIcon}
                            title={__("Taxonomy", "essential-blocks")}
                            description={taxonomyNotice}
                        />
                    )}

                    {hasResolved && !taxonomies && (
                        <NoticeComponent
                            Icon={TaxonomyIcon}
                            title={__("Taxonomy", "essential-blocks")}
                            description={`No taxonomies found for this post`}
                        />
                    )}

                    {hasResolved && taxonomies && (
                        <>
                            {Array.isArray(categories) &&
                                categories.length == 0 &&
                                eb_conditional_localize?.editor_type !==
                                    "edit-site" && (
                                    <NoticeComponent
                                        Icon={TaxonomyIcon}
                                        title={__(
                                            "Taxonomy",
                                            "essential-blocks",
                                        )}
                                        description={`Not found any data.`}
                                    />
                                )}
                            <div
                                className={`eb-taxonomies-wrapper ${blockId} ${displayStyle}`}
                                data-id={blockId}
                            >
                                {prefixType !== "none" && (
                                    <div className="prefix-wrap">
                                        {prefixType === "text" &&
                                            prefixText && (
                                                <DynamicInputValueHandler
                                                    value={prefixText}
                                                    tagName="span"
                                                    className="eb-taxonomy-prefix-text"
                                                    onChange={(prefixText) =>
                                                        setAttributes({
                                                            prefixText,
                                                        })
                                                    }
                                                    readOnly={true}
                                                />
                                            )}

                                        {prefixType === "icon" &&
                                            prefixIcon && (
                                                <EBDisplayIcon
                                                    icon={prefixIcon}
                                                    className={`eb-taxonomy-prefix-icon`}
                                                />
                                            )}
                                    </div>
                                )}

                                <div className="eb-tax-wrap">
                                    {renderCategoryList()}
                                </div>

                                {suffixType !== "none" && (
                                    <div className="suffix-wrap">
                                        {suffixType === "text" &&
                                            suffixText && (
                                                <DynamicInputValueHandler
                                                    value={suffixText}
                                                    placeholder="placeholder text"
                                                    tagName="span"
                                                    className="eb-taxonomy-suffix-text"
                                                    onChange={(suffixText) =>
                                                        setAttributes({
                                                            suffixText,
                                                        })
                                                    }
                                                    readOnly={true}
                                                />
                                            )}

                                        {suffixType === "icon" &&
                                            suffixIcon && (
                                                <EBDisplayIcon
                                                    icon={suffixIcon}
                                                    className={`eb-taxonomy-suffix-icon`}
                                                />
                                            )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(
    compose([
        withSelect((select, ownProps) => {
            const selectPostType = select("core/editor")
                ? select("core/editor").getCurrentPostType()
                : "";
            return {
                selectPostType: selectPostType,
            };
        }),
        withBlockContext(defaultAttributes),
    ])(Edit),
);
