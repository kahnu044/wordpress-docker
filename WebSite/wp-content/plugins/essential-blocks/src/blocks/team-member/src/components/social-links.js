import {
EBDisplayIconSave, EBDisplayIconEdit, sanitizeURL
} from "@essential-blocks/controls";
export default function SocialLinks(props) {
    const {
        socialDetails = [],
        icnEffect,
        linkNewTab,
        preset,
        component
    } = props;
    return (
        <ul className={`socials ${preset === 'new-preset3' ? 'socials-title' : ""}`}>
            {socialDetails.map(({ title, link, icon }, index) => (
                <li key={index}>
                    <a
                        className={icnEffect || " "}
                        href={link ? sanitizeURL(link) : ""}
                        {...(link && {
                            target: linkNewTab ? "_blank" : "_self",
                        })}
                        // target={linkNewTab ? "_blank" : "_self"}
                        rel="noopener"
                        title={title ? title : ""}
                    >
                        {component === "edit" ? (
                            <EBDisplayIconEdit className={'hvr-icon social-icon'} icon={icon} />
                        ) : (
                            <EBDisplayIconSave className={'hvr-icon social-icon'} icon={icon} />
                        )}
                        {preset === 'new-preset3' && title ? title : ""}
                    </a>
                </li>
            ))}
        </ul>
    );
}
