(* The two token–event graphs behind the Multihistory Science mark. *)
Needs["SetReplace`"];

Module[{minimal, evolution, input, output, leftEvent, rightEvent, diamond},
  minimal = SetReplace`WolframModel[
    {{{1}} -> {}, {{1}} -> {}},
    {{1}}, Infinity, "EventSelectionFunction" -> "MultiwaySpacelike"
  ]["ExpressionsEventsGraph"];

  evolution = SetReplace`WolframModel[
    {{{1}} -> {{1, 2}}, {{1}} -> {{1, 3}}},
    {{1}}, Infinity, "EventSelectionFunction" -> "MultiwaySpacelike"
  ]["ExpressionsEventsGraph"];

  (* In this example, the two output expressions {1, 2} and {1, 3}
     differ only by the name of the fresh atom. Identify their vertices,
     keeping the two events distinct. The original sketch used
     "DeduplicatedExpressionsEventsGraph" for that step. *)
  {input, output} = {{"Expression", 1}, {"Expression", 2}};
  {leftEvent, rightEvent} = {{"Event", 1}, {"Event", 2}};

  diamond = Graph[
    EdgeList[evolution] /. {"Expression", 3} -> output,
    VertexCoordinates -> {
      input -> {0, 1}, leftEvent -> {-1, 0}, rightEvent -> {1, 0}, output -> {0, -1}
    },
    VertexStyle -> {
      input -> RGBColor["#5369a4"], output -> RGBColor["#5369a4"],
      leftEvent -> RGBColor["#f7a300"], rightEvent -> RGBColor["#f7a300"]
    },
    EdgeStyle -> Directive[RGBColor["#aa5053"], AbsoluteThickness[2]],
    VertexSize -> Medium, ImageSize -> 200
  ];

  <|"MinimalMultihistory" -> minimal, "TokenDeduplication" -> diamond|>
]
