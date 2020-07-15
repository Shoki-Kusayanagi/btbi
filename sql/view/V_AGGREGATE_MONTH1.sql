Create view V_AGGREGATE_MONTH1 as 
Select
  substr(T1.T_Month,1,4) || '/' || substr(T1.T_Month,5,2)  as 運行月,
  T1.Company_Cd as 会社コード,
  T4.Master_Name As 会社名,
  T1.Base_Cd as 営業所コード,
  T5.Master_Name As 営業所名,
  T2.Route_Cd as 路線コード,
  T3.Route_Name as 路線名,
  T1.Line_Num as 系統コード,
  T2.Line_Name as 系統名,
  T1.Data_Type as データ種別コード,
  T6.Master_Name As データ種別,
  T1.Amount as 売上金額,
  T1.Adult_Cnt as 大人人数,
  T1.Child_Cnt as 小児人数,
  T1.Disadult_Cnt as 大割人数,
  T1.Dischild_Cnt as 小割人数
From
  T_Month_Line_Amount T1
Left Join
  M_Line T2
On
  LPAD(T1.Line_Num,8,'0') = LPAD(T2.Line_Num,8,'0')
Left Join
  M_Route T3
On
  T2.Route_Cd = T3.Route_Cd
Left Join
  M_Cd_Name T4
On
  T1.Company_Cd = T4.Name_Key And
  T4.Master_Kbn = '0010'
Left Join
  M_Cd_Name T5
On
  T1.Base_Cd = T5.Name_Key And
  T5.Master_Kbn = '0020'
Left Join
  M_Cd_Name T6
On
  T1.Data_Type = T6.Name_Key And
  T6.Master_Kbn = '0050'
Where
  T1.Data_Type IN ('01','05')
Order By
  T1.T_Month,
  T1.Company_Cd,
  T2.Route_Cd,
  T1.Line_Num,
  T1.Data_Type
