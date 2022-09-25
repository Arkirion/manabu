import { hiraganaImageRoute } from "../../common/utils/constants";
import { sanatizeImageName } from "../../common/utils/utils";
import { hiddingVariants } from "../../common/utils/animations";
import { hideElement } from "../../common/utils/utils";

import { GAME_MODES } from "../../common/hooks/useAnswer";

import { motion } from "framer-motion";

import './_TokenCard.sass'


export default function TokenCard({ name, gameMode, showHint }) {
  return (
    <div className="token">
      <motion.img
        src={`${hiraganaImageRoute}${name}.png`}
        key={name} // add key to re-render and trigger animation
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        exit={{ y: 30 }}
        transition={{ delay: 0.01 }}
      />
      <motion.small
        style={{ ...hideElement(gameMode === GAME_MODES.reveal) }}
        variants={hiddingVariants}
        initial={{ opacity: 0 }}
        animate={!showHint ? "hidden" : "visible"}
      >
        {sanatizeImageName(name)}
      </motion.small>
    </div>
  );
}
