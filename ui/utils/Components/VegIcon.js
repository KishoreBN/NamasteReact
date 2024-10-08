const VegIcon = (props) =>{
    const {veg} = props;
    return(
        <div className={veg ? `veg-icon-square borderColorGreen` : `veg-icon-square borderColorRed`}>
            <div className={veg ? `veg-icon-circle backgroundColorGreen` : `veg-icon-circle backgroundColorRed`}></div>
        </div>
    )
};

export default VegIcon;