interface IProps {
  /**
   * @description businessKey
   */
  businessKey: string;
  /**
   * @description createTime
   */
  createTime: string;
  /**
   * @description creator
   */
  creator: string;
  /**
   * @description flowName
   */
  flowName: string;
  /**
   * @description onlineTableId
   */
  onlineTableId: string;
  /**
   * @description processInstanceTitle
   */
  processInstanceTitle: string;
  /**
   * @description onlineTable
   */
  onlineTable: {
    ticket_type: string;
  }[];
  /**
   * @description status
   */
  status?: string;
  /**
   * @description processInstanceId
   */
  processInstanceId: string;
  /**
   * @description processDefinitionId
   */
  processDefinitionId: string;
  /**
   * @description taskId
   */
  taskId: string;
  /**
   * @description taskCreateTime
   */
  taskCreateTime: string;
}

export default (props: IProps) => {
  return null;
};
