/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";

import attributes from "./attributes";

const deprecated = [
	{
		attributes: { ...attributes },
		supports: {
			align: ["wide", "full"],
		},
		save: ({ attributes }) => {
			const {
				blockId,
				pricingStyle,
				title,
				showSubtitle,
				subtitle,
				showHeaderIcon,
				headerIcon,
				mainPrice,
				showOnSale,
				salePrice,
				priceCurrency,
				currencyPlacement,
				pricePeriod,
				periodSeparator,
				hideFeatures,
				features,
				showButton,
				buttonIcon,
				buttonIconPosition,
				buttonText,
				buttonURL,
				contentAlign,
				showRibbon,
				ribbonStyle,
				classHook,
			} = attributes;

			// ribbon Class
			const ribbonClass = showRibbon ? ` featured ${ribbonStyle}` : "";

			return (
				<div {...useBlockProps.save()}>
					<div
						className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
					>
						<div
							className={`${blockId} eb-pricing-wrapper eb-pricing-content-${contentAlign}`}
						>
							<div className={`eb-pricing ${pricingStyle}`}>
								<div className={`eb-pricing-item${ribbonClass}`}>
									<div className="eb-pricing-item-overlay"></div>
									{showHeaderIcon && (
										<div className="eb-pricing-icon" data-icon={headerIcon}>
											<span className="icon">
												<i class={headerIcon}></i>
											</span>
										</div>
									)}
									<div className="eb-pricing-header">
										<h2 className="eb-pricing-title">{title}</h2>
										{showSubtitle && (
											<span className="eb-pricing-subtitle">{subtitle}</span>
										)}
									</div>
									{pricingStyle !== "style-3" && (
										<div className="eb-pricing-tag">
											<span className="price-tag">
												<span
													className={`original-price${
														showOnSale === true ? " line-through" : ""
													}`}
													data-price={mainPrice}
												>
													{currencyPlacement === "left" && (
														<span className="price-currency">
															{priceCurrency}
														</span>
													)}
													{mainPrice}
													{currencyPlacement === "right" && (
														<span className="price-currency">
															{priceCurrency}
														</span>
													)}
												</span>

												{showOnSale && (
													<>
														<span
															className="sale-price"
															data-sale-price={salePrice}
														>
															{currencyPlacement === "left" && (
																<span className="price-currency">
																	{priceCurrency}
																</span>
															)}
															{salePrice}
															{currencyPlacement === "right" && (
																<span className="price-currency">
																	{priceCurrency}
																</span>
															)}
														</span>
													</>
												)}
											</span>
											<span
												className="price-period"
												data-period-separator={periodSeparator}
												data-price-period={pricePeriod}
											>
												{periodSeparator} {pricePeriod}
											</span>
										</div>
									)}
									{hideFeatures !== true && (
										<>
											<div className="eb-pricing-body">
												<ul className="eb-pricebox-features">
													{features.map(
														({ icon, text, color, clickable, link }, index) => (
															<li
																key={index}
																className="eb-pricebox-feature-item"
																data-icon={icon}
																data-color={color}
																data-clickable={clickable}
																data-link={link}
															>
																{clickable && link ? (
																	<a href={link}>
																		<span
																			className={`eb-pricebox-icon ${icon}`}
																			style={{ color: color }}
																		/>
																		<span className="eb-pricebox-feature-text">
																			{text}
																		</span>
																	</a>
																) : (
																	<>
																		<span
																			className={`eb-pricebox-icon ${icon}`}
																			style={{ color: color }}
																		/>
																		<span className="eb-pricebox-feature-text">
																			{text}
																		</span>
																	</>
																)}
															</li>
														)
													)}
												</ul>
											</div>
										</>
									)}
									{pricingStyle === "style-3" && (
										<div className="eb-pricing-tag">
											<span className="price-tag">
												<span
													className={`original-price${
														showOnSale === true ? " line-through" : ""
													}`}
													data-price={mainPrice}
												>
													{currencyPlacement === "left" && (
														<span className="price-currency">
															{priceCurrency}
														</span>
													)}
													{mainPrice}
													{currencyPlacement === "right" && (
														<span className="price-currency">
															{priceCurrency}
														</span>
													)}
												</span>

												{showOnSale && (
													<>
														<span
															className="sale-price"
															data-sale-price={salePrice}
														>
															{currencyPlacement === "left" && (
																<span className="price-currency">
																	{priceCurrency}
																</span>
															)}
															{salePrice}
															{currencyPlacement === "right" && (
																<span className="price-currency">
																	{priceCurrency}
																</span>
															)}
														</span>
													</>
												)}
											</span>
											<span
												className="price-period"
												data-period-separator={periodSeparator}
												data-price-period={pricePeriod}
											>
												{periodSeparator} {pricePeriod}
											</span>
										</div>
									)}
									{showButton && (
										<div className="eb-pricing-footer" data-icon={buttonIcon}>
											<div className="eb-pricing-button-wrapper">
												<a href={buttonURL} className="eb-pricing-button">
													{buttonIconPosition === "left" && (
														<i className={buttonIcon}></i>
													)}
													<span className="eb-button-text">{buttonText}</span>
													{buttonIconPosition === "right" && (
														<i className={buttonIcon}></i>
													)}
												</a>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				// edit view end
			);
		},
	},
	{
		attributes: {
			...attributes,
		},
		supports: {
			align: ["wide", "full"],
		},
		save: ({ attributes }) => {
			const {
				blockId,
				pricingStyle,
				title,
				showSubtitle,
				subtitle,
				showHeaderIcon,
				headerIcon,
				mainPrice,
				showOnSale,
				salePrice,
				priceCurrency,
				currencyPlacement,
				pricePeriod,
				periodSeparator,
				hideFeatures,
				features,
				showButton,
				buttonIcon,
				buttonIconPosition,
				buttonText,
				buttonURL,
				contentAlign,
				showRibbon,
				ribbonStyle,
			} = attributes;

			// ribbon Class
			const ribbonClass = showRibbon ? ` featured ${ribbonStyle}` : "";

			return (
				<div {...useBlockProps.save()}>
					<div
						className={`${blockId} eb-pricing-wrapper eb-pricing-content-${contentAlign}`}
					>
						<div className={`eb-pricing ${pricingStyle}`}>
							<div className={`eb-pricing-item${ribbonClass}`}>
								<div className="eb-pricing-item-overlay"></div>
								{showHeaderIcon && (
									<div className="eb-pricing-icon" data-icon={headerIcon}>
										<span className="icon">
											<i className={headerIcon}></i>
										</span>
									</div>
								)}
								<div className="eb-pricing-header">
									<h2 className="eb-pricing-title">{title}</h2>
									{showSubtitle && (
										<span className="eb-pricing-subtitle">{subtitle}</span>
									)}
								</div>
								{pricingStyle !== "style-3" && (
									<div className="eb-pricing-tag">
										<span className="price-tag">
											<span
												className={`original-price${
													showOnSale === true ? " line-through" : ""
												}`}
												data-price={mainPrice}
											>
												{currencyPlacement === "left" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
												{mainPrice}
												{currencyPlacement === "right" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
											</span>

											{showOnSale && (
												<>
													<span
														className="sale-price"
														data-sale-price={salePrice}
													>
														{currencyPlacement === "left" && (
															<span className="price-currency">
																{priceCurrency}
															</span>
														)}
														{salePrice}
														{currencyPlacement === "right" && (
															<span className="price-currency">
																{priceCurrency}
															</span>
														)}
													</span>
												</>
											)}
										</span>
										<span
											className="price-period"
											data-period-separator={periodSeparator}
											data-price-period={pricePeriod}
										>
											{periodSeparator} {pricePeriod}
										</span>
									</div>
								)}
								{hideFeatures !== true && (
									<>
										<div className="eb-pricing-body">
											<ul className="eb-pricebox-features">
												{features.map(
													({ icon, text, color, clickable, link }, index) => (
														<li
															key={index}
															className="eb-pricebox-feature-item"
															data-icon={icon}
															data-color={color}
															data-clickable={clickable}
															data-link={link}
														>
															{clickable && link ? (
																<a href={link}>
																	<span
																		className={`eb-pricebox-icon ${icon}`}
																		style={{ color: color }}
																	/>
																	<span className="eb-pricebox-feature-text">
																		{text}
																	</span>
																</a>
															) : (
																<>
																	<span
																		className={`eb-pricebox-icon ${icon}`}
																		style={{ color: color }}
																	/>
																	<span className="eb-pricebox-feature-text">
																		{text}
																	</span>
																</>
															)}
														</li>
													)
												)}
											</ul>
										</div>
									</>
								)}
								{pricingStyle === "style-3" && (
									<div className="eb-pricing-tag">
										<span className="price-tag">
											<span
												className={`original-price${
													showOnSale === true ? " line-through" : ""
												}`}
												data-price={mainPrice}
											>
												{currencyPlacement === "left" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
												{mainPrice}
												{currencyPlacement === "right" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
											</span>

											{showOnSale && (
												<>
													<span
														className="sale-price"
														data-sale-price={salePrice}
													>
														{currencyPlacement === "left" && (
															<span className="price-currency">
																{priceCurrency}
															</span>
														)}
														{salePrice}
														{currencyPlacement === "right" && (
															<span className="price-currency">
																{priceCurrency}
															</span>
														)}
													</span>
												</>
											)}
										</span>
										<span
											className="price-period"
											data-period-separator={periodSeparator}
											data-price-period={pricePeriod}
										>
											{periodSeparator} {pricePeriod}
										</span>
									</div>
								)}
								{showButton && (
									<div className="eb-pricing-footer" data-icon={buttonIcon}>
										<div className="eb-pricing-button-wrapper">
											<a href={buttonURL} className="eb-pricing-button">
												{buttonIconPosition === "left" && (
													<i className={buttonIcon}></i>
												)}
												<span className="eb-button-text">{buttonText}</span>
												{buttonIconPosition === "right" && (
													<i className={buttonIcon}></i>
												)}
											</a>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				// edit view end
			);
		},
	},
	{
		attributes: {
			...attributes,
			hideFeatures: {
				type: "boolean",
				default: false,
			},
		},
		save: ({ attributes }) => {
			const {
				blockId,
				pricingStyle,
				title,
				showSubtitle,
				subtitle,
				showHeaderIcon,
				headerIcon,
				mainPrice,
				showOnSale,
				salePrice,
				priceCurrency,
				currencyPlacement,
				pricePeriod,
				periodSeparator,
				features,
				showButton,
				buttonIcon,
				buttonIconPosition,
				buttonText,
				buttonURL,
				contentAlign,
				showRibbon,
				ribbonStyle,
			} = attributes;

			// ribbon Class
			const ribbonClass = showRibbon ? ` featured ${ribbonStyle}` : "";

			return (
				<div {...useBlockProps.save()}>
					<div
						className={`${blockId} eb-pricing-wrapper eb-pricing-content-${contentAlign}`}
					>
						<div className={`eb-pricing ${pricingStyle}`}>
							<div className={`eb-pricing-item${ribbonClass}`}>
								<div className="eb-pricing-item-overlay"></div>
								{showHeaderIcon && (
									<div className="eb-pricing-icon" data-icon={headerIcon}>
										<span className="icon">
											<i className={headerIcon}></i>
										</span>
									</div>
								)}
								<div className="eb-pricing-header">
									<h2 className="eb-pricing-title">{title}</h2>
									{showSubtitle && (
										<span className="eb-pricing-subtitle">{subtitle}</span>
									)}
								</div>
								{pricingStyle !== "style-3" && (
									<div className="eb-pricing-tag">
										<span className="price-tag">
											<span
												className={`original-price${
													showOnSale === true ? " line-through" : ""
												}`}
												data-price={mainPrice}
											>
												{currencyPlacement === "left" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
												{mainPrice}
												{currencyPlacement === "right" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
											</span>

											{showOnSale && (
												<>
													<span
														className="sale-price"
														data-sale-price={salePrice}
													>
														{currencyPlacement === "left" && (
															<span className="price-currency">
																{priceCurrency}
															</span>
														)}
														{salePrice}
														{currencyPlacement === "right" && (
															<span className="price-currency">
																{priceCurrency}
															</span>
														)}
													</span>
												</>
											)}
										</span>
										<span
											className="price-period"
											data-period-separator={periodSeparator}
											data-price-period={pricePeriod}
										>
											{periodSeparator} {pricePeriod}
										</span>
									</div>
								)}
								<div className="eb-pricing-body">
									<ul className="eb-pricebox-features">
										{features.map(
											({ icon, text, color, clickable, link }, index) => (
												<li
													key={index}
													className="eb-pricebox-feature-item"
													data-icon={icon}
													data-color={color}
													data-clickable={clickable}
													data-link={link}
												>
													{clickable && link ? (
														<a href={link}>
															<span
																className={`eb-pricebox-icon ${icon}`}
																style={{ color: color }}
															/>
															<span className="eb-pricebox-feature-text">
																{text}
															</span>
														</a>
													) : (
														<>
															<span
																className={`eb-pricebox-icon ${icon}`}
																style={{ color: color }}
															/>
															<span className="eb-pricebox-feature-text">
																{text}
															</span>
														</>
													)}
												</li>
											)
										)}
									</ul>
								</div>
								{pricingStyle === "style-3" && (
									<div className="eb-pricing-tag">
										<span className="price-tag">
											<span
												className={`original-price${
													showOnSale === true ? " line-through" : ""
												}`}
												data-price={mainPrice}
											>
												{currencyPlacement === "left" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
												{mainPrice}
												{currencyPlacement === "right" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
											</span>

											{showOnSale && (
												<>
													<span
														className="sale-price"
														data-sale-price={salePrice}
													>
														{currencyPlacement === "left" && (
															<span className="price-currency">
																{priceCurrency}
															</span>
														)}
														{salePrice}
														{currencyPlacement === "right" && (
															<span className="price-currency">
																{priceCurrency}
															</span>
														)}
													</span>
												</>
											)}
										</span>
										<span
											className="price-period"
											data-period-separator={periodSeparator}
											data-price-period={pricePeriod}
										>
											{periodSeparator} {pricePeriod}
										</span>
									</div>
								)}
								{showButton && (
									<div className="eb-pricing-footer" data-icon={buttonIcon}>
										<div className="eb-pricing-button-wrapper">
											<a href={buttonURL} className="eb-pricing-button">
												{buttonIconPosition === "left" && (
													<i className={buttonIcon}></i>
												)}
												<span className="eb-button-text">{buttonText}</span>
												{buttonIconPosition === "right" && (
													<i className={buttonIcon}></i>
												)}
											</a>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				// edit view end
			);
		},
	},
	{
		attributes: { ...attributes },
		save: ({ attributes }) => {
			const {
				blockId,
				pricingStyle,
				title,
				showSubtitle,
				subtitle,
				showHeaderIcon,
				headerIcon,
				mainPrice,
				showOnSale,
				salePrice,
				priceCurrency,
				currencyPlacement,
				pricePeriod,
				periodSeparator,
				features,
				showButton,
				buttonIcon,
				buttonIconPosition,
				buttonText,
				buttonURL,
				contentAlign,
				showRibbon,
				ribbonStyle,
			} = attributes;

			// ribbon Class
			const ribbonClass = showRibbon ? ` featured ${ribbonStyle}` : "";

			return (
				<div {...useBlockProps.save()}>
					<div className={`${blockId} eb-pricing-content-${contentAlign}`}>
						<div className={`eb-pricing ${pricingStyle}`}>
							<div className={`eb-pricing-item${ribbonClass}`}>
								<div className="eb-pricing-item-overlay"></div>
								{showHeaderIcon && (
									<div className="eb-pricing-icon" data-icon={headerIcon}>
										<span className="icon">
											<i className={headerIcon}></i>
										</span>
									</div>
								)}
								<div className="eb-pricing-header">
									<h2 className="eb-pricing-title">{title}</h2>
									{showSubtitle && (
										<span className="eb-pricing-subtitle">{subtitle}</span>
									)}
								</div>
								{pricingStyle !== "style-3" && (
									<div className="eb-pricing-tag">
										<span className="price-tag">
											<span
												className={`original-price${
													showOnSale === true ? " line-through" : ""
												}`}
												data-price={mainPrice}
											>
												{currencyPlacement === "left" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
												{mainPrice}
												{currencyPlacement === "right" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
											</span>

											{showOnSale && (
												<>
													<span
														className="sale-price"
														data-sale-price={salePrice}
													>
														{currencyPlacement === "left" && (
															<span className="price-currency">
																{priceCurrency}
															</span>
														)}
														{salePrice}
														{currencyPlacement === "right" && (
															<span className="price-currency">
																{priceCurrency}
															</span>
														)}
													</span>
												</>
											)}
										</span>
										<span
											className="price-period"
											data-period-separator={periodSeparator}
											data-price-period={pricePeriod}
										>
											{periodSeparator} {pricePeriod}
										</span>
									</div>
								)}
								<div className="eb-pricing-body">
									<ul className="eb-pricebox-features">
										{features.map(({ icon, text, color, clickable, link }) => (
											<li
												className="eb-pricebox-feature-item"
												data-icon={icon}
												data-color={color}
												data-clickable={clickable}
												data-link={link}
											>
												{clickable && link ? (
													<a href={link}>
														<span
															className={`eb-pricebox-icon ${icon}`}
															style={{ color: color }}
														/>
														<span className="eb-pricebox-feature-text">
															{text}
														</span>
													</a>
												) : (
													<>
														<span
															className={`eb-pricebox-icon ${icon}`}
															style={{ color: color }}
														/>
														<span className="eb-pricebox-feature-text">
															{text}
														</span>
													</>
												)}
											</li>
										))}
									</ul>
								</div>
								{pricingStyle === "style-3" && (
									<div className="eb-pricing-tag">
										<span className="price-tag">
											<span
												className={`original-price${
													showOnSale === true ? " line-through" : ""
												}`}
												data-price={mainPrice}
											>
												{currencyPlacement === "left" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
												{mainPrice}
												{currencyPlacement === "right" && (
													<span className="price-currency">
														{priceCurrency}
													</span>
												)}
											</span>

											{showOnSale && (
												<>
													<span
														className="sale-price"
														data-sale-price={salePrice}
													>
														{currencyPlacement === "left" && (
															<span className="price-currency">
																{priceCurrency}
															</span>
														)}
														{salePrice}
														{currencyPlacement === "right" && (
															<span className="price-currency">
																{priceCurrency}
															</span>
														)}
													</span>
												</>
											)}
										</span>
										<span
											className="price-period"
											data-period-separator={periodSeparator}
											data-price-period={pricePeriod}
										>
											{periodSeparator} {pricePeriod}
										</span>
									</div>
								)}
								{showButton && (
									<div className="eb-pricing-footer" data-icon={buttonIcon}>
										<div className="eb-pricing-button-wrapper">
											<a href={buttonURL} className="eb-pricing-button">
												{buttonIconPosition === "left" && (
													<i className={buttonIcon}></i>
												)}
												<span className="eb-button-text">{buttonText}</span>
												{buttonIconPosition === "right" && (
													<i className={buttonIcon}></i>
												)}
											</a>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				// edit view end
			);
		},
	},
];

export default deprecated;
