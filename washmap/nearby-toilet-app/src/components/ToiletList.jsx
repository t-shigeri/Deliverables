import React from "react";

const ToiletList = ({ toilets, selectedPlaceId, onClickItem }) => {
  return (
    <>
      {/* ❶ タイトル部分 */}
      <h2>Toilet</h2>

      {/* ❷ リスト本体を .list-container で囲む */}
      <div className="list-container">
        {toilets.length === 0 ? (
          <p>検索結果がありません。</p>
        ) : (
          <ul>
            {toilets.map((place) => {
              const placeId = place.place_id;
              const isSelected = placeId === selectedPlaceId;
              return (
                <li
                  key={placeId}
                  className={isSelected ? "selected" : ""}
                  onClick={() => onClickItem(place)}
                >
                  <strong>{place.name}</strong>
                  <br />
                  {place.vicinity || "住所情報なし"}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default ToiletList;
