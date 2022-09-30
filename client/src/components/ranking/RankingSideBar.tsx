const RankingSideBar: React.FC = () => {

    // Fixed values for the time being.
    const sideList = ['Global Rankings', 'Topic Rankings', 'Course Rankings'];
    const sideSublist = [[], ['Array', 'String', 'Concurrency', 'Linked List', 'Multithreading'], ['CS 101', 'CS 130', 'CS 220', 'CS 225', 'CS 230', 'CS 235', 'CS 320', 'CS 331', 'CS 335', 'CS 340', 'CS373']];

    return (
        <>
            <div className="text-4xl pr-8 w-40 text-right text-gray-600 pt-16">Global</div>
            <div className="text-main-400 font-bold text-right pr-8 pb-10 w-40">Rankings</div>
            <table className="w-40 bg-gray-100 rounded-2xl shadow-lg">
                <tbody>
                    {(() => {
                        let tr = [];
                        for (let i = 0; i < sideList.length; i++) {
                            tr.push(<tr key={"SideBarTr" + i.toString()}><td className="px-3 pt-2 pb-1">{sideList[i]}</td></tr>);
                            for (let j = 0; j < sideSublist[i].length; j++) {
                                tr.push(<tr key={"SideBarTr" + i.toString() + j.toString()}><td className="px-5 pb-2 text-xs">{sideSublist[i][j]}</td></tr>);
                            }
                        }
                        return tr;
                    })()}
                </tbody>
            </table>
        </>
    );
}

export default RankingSideBar;