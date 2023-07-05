export default function SocialLinks({
    socialDetails = [],
    icnEffect,
    linkNewTab,
}) {
    return (
        <ul className="socials">
            {socialDetails.map(({ title, link, icon }, index) => (
                <li key={index}>
                    <a
                        className={icnEffect || " "}
                        href={link ? link : "javascript:void(0)"}
                        {...(link && {
                            target: linkNewTab ? "_blank" : "_self",
                        })}
                        // target={linkNewTab ? "_blank" : "_self"}
                        rel="noopener"
                        title={title ? title : ""}
                    >
                        <i className={`hvr-icon social-icon ${icon}`}></i>
                    </a>
                </li>
            ))}
        </ul>
    );
}
